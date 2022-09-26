import { Skeleton, Modal as AhaModal } from '@ahaui/react'
import { nanoid } from '@reduxjs/toolkit'
import { delay } from 'lodash'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import Avatar from 'components/Common/Avatar'
import CustomBreadcrumnb from 'components/Common/Breadcrumb'
import Button from 'components/Common/Button'
import Spinner from 'components/Common/Spinner'
import { ErrorFallback } from 'components/Layout/ErrorFallback'
import PageHeader from 'components/Layout/PageHeader'
import { useAsync } from 'hooks/useAsync'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectAllOwners, fetchOwners } from 'store/ownerSlice'
import {
  selectPet,
  selectAllPets,
  fetchPets,
  addNewPet,
  updatePet,
  removePet,
} from 'store/petSlice'
import { Status } from 'types/enum'
import type {
  PetDexieModel,
  BreadcrumbItemm,
  OwnerDexieModel,
} from 'types/types'

import AddPetForm from './PetAddForm'
import EditPetForm from './PetEditForm'

const PetListLayout = styled.div`
  padding: 1rem;
`

const DataCell = styled.td<{
  withAvatar?: boolean
  withAction?: string
  isMobile?: boolean
}>`
  ${(props) => {
    if (Boolean(props.isMobile)) {
      if (props.withAvatar) {
        return css`
          &:first-child {
            width: 50%;
          }
        `
      }
      return css`
        display: flex;
      `
    } else {
      if (props.withAvatar) {
        return css`
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: start;
        `
      } else {
        return css`
          vertical-align: middle !important;
        `
      }
    }
  }}
`

interface PetViewModel extends PetDexieModel {
  readonly ownerName: string | undefined
  readonly ownerPhone: string | undefined
}
const PetList = () => {
  const [petViewData, setPetViewData] = React.useState<PetViewModel[]>([])
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false)
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false)
  const [activePetId, setActivePetId] = React.useState<string | undefined>(
    undefined
  )
  const isTablet = useMediaQuery('(min-width: 768px)')

  const dispatch = useAppDispatch()
  const petState = useAppSelector(selectPet)
  const pets = useAppSelector(selectAllPets)
  const owners = useAppSelector(selectAllOwners)

  const navigate = useNavigate()
  const { isRejected, error } = useAsync()
  const breadcrumbItems: BreadcrumbItemm[] = [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: '/pets',
      name: 'Pet List',
    },
  ]

  React.useEffect(() => {
    dispatch(fetchPets())
    dispatch(fetchOwners())
  }, [])

  React.useEffect(() => {
    if (owners.length && pets.length) {
      const data = mergeOwnerToPet(pets, owners)
      setPetViewData(data)
    }
  }, [owners, pets])

  if (isRejected) {
    return <ErrorFallback error={error} />
  }

  function mergeOwnerToPet(
    pets: PetDexieModel[],
    owners: OwnerDexieModel[]
  ): PetViewModel[] {
    const result: PetViewModel[] = []
    pets.forEach((pet: PetDexieModel) => {
      const foundOwner = owners.find(
        (owner: OwnerDexieModel) => owner.id === pet.owner
      )
      result.push({
        ...pet,
        ownerName: foundOwner?.name,
        ownerPhone: foundOwner?.phoneNumber,
      })
    })
    return result
  }

  function handleClickViewBtn(petId: string) {
    navigate(`/pet/${petId}`)
    return false
  }

  function handleClickEditBtn(petId: string) {
    setActivePetId(petId)
    setShowEditModal(true)
  }

  function handleClickDeleteBtn(petId: string) {
    setActivePetId(petId)
    setShowDeleteModal(true)
  }

  async function handleAdd(data: any) {
    const body: PetDexieModel = {
      id: nanoid(),
      ...data,
    }
    dispatch(addNewPet(body))

    delay(() => {
      setShowAddModal(false)
    }, 1000)

    return false
  }

  async function onSubmitEdit(data: any) {
    if (activePetId) {
      dispatch(
        updatePet({
          petId: activePetId,
          body: data,
        })
      )
    }

    delay(() => {
      setShowEditModal(false)
      window.location.assign(window.location.toString())
    }, 500)

    return false
  }

  async function onSubmitDelete() {
    if (activePetId) {
      dispatch(removePet(activePetId))
      delay(() => {
        setShowDeleteModal(false)
        window.location.assign(window.location.toString())
      }, 500)
    }
  }

  return (
    <React.Fragment>
      <PageHeader title="Pet List">
        <Button variant="secondary" onClick={() => setShowAddModal(true)}>
          Add
        </Button>
      </PageHeader>
      <PetListLayout>
        <CustomBreadcrumnb items={breadcrumbItems} />
        <div
          className="u-widthFull u-block u-overflowHorizontalAuto"
          style={{ maxHeight: '70vh' }}
        >
          {petViewData.length ? (
            <table className="Table Table--stickyHeader u-backgroundWhite u-textDark u-text200">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Owner Name</th>
                  <th scope="col">Owner Phone</th>
                  <th scope="col">Type</th>
                  <th scope="col">Breed</th>
                  <th scope="col">Size</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {petViewData.map((item: PetViewModel, index: number) => (
                  <tr key={item.id}>
                    <DataCell>{index + 1}</DataCell>
                    <DataCell withAvatar isMobile={!isTablet}>
                      <Avatar isDefault />
                      <span>{item.name}</span>
                    </DataCell>
                    <DataCell>
                      <Link to={`/owner/${item.owner}`}>{item.ownerName}</Link>
                    </DataCell>
                    <DataCell>{item.ownerPhone}</DataCell>
                    <DataCell>{item.type}</DataCell>
                    <DataCell>{item.breed}</DataCell>
                    <DataCell>{item.size}</DataCell>
                    <DataCell isMobile={!isTablet}>
                      <Button
                        variant="primary"
                        onClick={() => handleClickViewBtn(item.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleClickEditBtn(item.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleClickDeleteBtn(item.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Delete
                      </Button>
                    </DataCell>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <TableSkeleton />
          )}
        </div>
      </PetListLayout>

      {showAddModal && (
        <AhaModal
          show={showAddModal}
          centered
          onHide={() => setShowAddModal(false)}
        >
          <AhaModal.Header closeButton>
            <AhaModal.Title>Add Pet</AhaModal.Title>
          </AhaModal.Header>
          <AhaModal.Body>
            <AddPetForm
              owners={owners}
              onSubmit={handleAdd}
              submitButton={<Button variant="primary">Add</Button>}
              isPending={petState.status === Status.PENDING}
            />
          </AhaModal.Body>
        </AhaModal>
      )}

      {showEditModal && activePetId && (
        <AhaModal
          show={showEditModal}
          centered
          onHide={() => setShowEditModal(false)}
        >
          <AhaModal.Header closeButton>
            <AhaModal.Title>Edit Pet</AhaModal.Title>
          </AhaModal.Header>
          <AhaModal.Body>
            <EditPetForm
              owners={owners}
              petData={petState.entities[activePetId]}
              onSubmit={onSubmitEdit}
              submitButton={<Button variant="primary">Confirm</Button>}
              isPending={petState.status === Status.PENDING}
            />
          </AhaModal.Body>
        </AhaModal>
      )}

      {showDeleteModal && activePetId && (
        <AhaModal
          show={showDeleteModal}
          centered
          onHide={() => setShowDeleteModal(false)}
        >
          <AhaModal.Header closeButton>
            <AhaModal.Title>Delete Pet</AhaModal.Title>
          </AhaModal.Header>
          <AhaModal.Body>
            <p>Are you sure?</p>
          </AhaModal.Body>
          <AhaModal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={onSubmitDelete}>
              Ok{' '}
              {petState.status === Status.PENDING ? (
                <Spinner style={{ marginLeft: 5 }} />
              ) : null}
            </Button>
          </AhaModal.Footer>
        </AhaModal>
      )}
    </React.Fragment>
  )
}

const TableSkeleton: React.FC<{ noCols?: number; noRows?: number }> = ({
  noCols = 5,
  noRows = 10,
}) => {
  if (noCols === 0 || noRows === 0) {
    return null
  }
  return (
    <table className="Table u-backgroundWhite u-textDark u-text200">
      <thead>
        <tr>
          {new Array(noCols).fill(null).map((_, idx: number) => (
            <th scope="col" key={idx} style={{ width: '15%' }}>
              <Skeleton width="50%" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {new Array(noRows).fill(null).map((_, idx: number) => (
          <tr key={idx}>
            {new Array(noCols).fill(null).map((_, id: number) => {
              if (id === 1) {
                return (
                  <td
                    key={id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '10px',
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <Skeleton variant="circle" width={32} height={32} />
                    <Skeleton width="100%" />
                  </td>
                )
              } else {
                return (
                  <td key={id}>
                    <Skeleton />
                  </td>
                )
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PetList
