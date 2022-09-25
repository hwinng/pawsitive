import { Modal as AhaModal } from '@ahaui/react'
import type { EntityId } from '@reduxjs/toolkit'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAsync } from '../../../hooks/useAsync'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchOwners, selectAllOwners } from '../../../store/ownerSlice'
import {
  fetchPetDetail,
  removePet,
  selectPetById,
} from '../../../store/petSlice'
import { HttpMethod } from '../../../types/enum'
import type {
  BreadcrumbItemm,
  OwnerDexieModel,
  PetDexieModel,
} from '../../../types/types'
import { client } from '../../../utils/client-api'
import CustomBreadcrumnb from '../../Common/Breadcrumb'
import Button from '../../Common/Button'
import Spinner from '../../Common/Spinner'
import { ErrorFallback } from '../../Layout/ErrorFallback'
import PageHeader from '../../Layout/PageHeader'
import RowItem from '../RowItem'

import EditPetForm from './PetEditForm'

const PetDetailLayout = styled.div`
  padding: 1rem;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding-top: 2rem;
`

type PetDetailProps = {}
const PetDetail: React.FC<PetDetailProps> = () => {
  const { run, isRejected, error, isPending } = useAsync()
  const [ownerData, setOwnerData] = React.useState<OwnerDexieModel | undefined>(
    undefined
  )
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const { petId } = useParams()
  const navigate = useNavigate()
  const petDetail = useAppSelector((state) =>
    selectPetById(state, petId as EntityId)
  )
  const owners = useAppSelector(selectAllOwners)
  const dispatch = useAppDispatch()
  const breadcrumbItems: BreadcrumbItemm[] = [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: '/pets',
      name: 'Pet List',
    },
    {
      name: 'Pet Detail',
    },
  ]

  React.useEffect(() => {
    if (petId) {
      dispatch(fetchPetDetail(petId))
    }
  }, [petId])

  React.useEffect(() => {
    if (petDetail?.owner) {
      fetchOwnerDetail(petDetail.owner)
    }
  }, [petDetail?.owner])

  if (isRejected) {
    return <ErrorFallback error={error} />
  }

  async function fetchOwnerDetail(ownerId: string) {
    try {
      const res = await client(`/api/owner/${ownerId}`)
      setOwnerData(res.data)
    } catch (err) {
      throw err
    }
  }

  function handleOpenEdit() {
    dispatch(fetchOwners())
    setShowEditModal(true)
  }
  async function handleEdit(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ownerId, ...rest } = data
    const body: Partial<PetDexieModel> = {
      owner: data.ownerId,
      ...rest,
    }
    run(updatePet(body))
      .then(() => {
        setShowEditModal(false)
      })
      .finally(() => {
        window.location.assign(window.location.toString())
      })
    return false
  }

  async function updatePet(data: Partial<PetDexieModel>) {
    try {
      const res = await client(`/api/pet/${petId}`, {
        method: HttpMethod.PUT,
        data,
      })
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function handleDeletePet(petId: string | undefined) {
    if (petId) {
      dispatch(removePet(petId))
      navigate('/pets')
    }
  }

  return (
    <React.Fragment>
      <PageHeader title="Pet Detail">
        <Button variant="secondary" onClick={handleOpenEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          Delete
        </Button>
      </PageHeader>
      <PetDetailLayout>
        <CustomBreadcrumnb items={breadcrumbItems} />
        <div>
          <RowWrapper>
            <RowItem field="Pet Id" value={petId} />
            <RowItem field="Owner Name" value={ownerData?.name} />
            <RowItem field="Owner Phone" value={ownerData?.phoneNumber} />
            <RowItem field="Pet Name" value={petDetail?.name} />
            <RowItem field="Type" value={petDetail?.type} />
            <RowItem field="Breed" value={petDetail?.breed} />
            <RowItem field="Size" value={petDetail?.size} />
          </RowWrapper>
        </div>
      </PetDetailLayout>

      {showEditModal && (
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
              petData={petDetail}
              onSubmit={handleEdit}
              submitButton={<Button variant="primary">Confirm</Button>}
              isPending={isPending}
            />
          </AhaModal.Body>
        </AhaModal>
      )}

      {showDeleteModal && (
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
            <Button variant="primary" onClick={() => handleDeletePet(petId)}>
              Ok {isPending ? <Spinner style={{ marginLeft: 5 }} /> : null}
            </Button>
          </AhaModal.Footer>
        </AhaModal>
      )}
    </React.Fragment>
  )
}
export default PetDetail
