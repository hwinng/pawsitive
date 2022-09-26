import { Modal as AhaModal } from '@ahaui/react'
import type { EntityId } from '@reduxjs/toolkit'
import { delay } from 'lodash'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import RowItem from 'components/Authenticated/RowItem'
import CustomBreadcrumnb from 'components/Common/Breadcrumb'
import Button from 'components/Common/Button'
import Spinner from 'components/Common/Spinner'
import { ErrorFallback } from 'components/Layout/ErrorFallback'
import PageHeader from 'components/Layout/PageHeader'
import { useAsync } from 'hooks/useAsync'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { selectAllOwners, fetchOwners } from 'store/ownerSlice'
import {
  selectPet,
  selectPetById,
  fetchPetDetail,
  updatePet,
  removePet,
} from 'store/petSlice'
import { Status } from 'types/enum'
import type { OwnerDexieModel, BreadcrumbItemm } from 'types/types'
import { client } from 'utils/clientApi'

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
  const { petId } = useParams()
  const navigate = useNavigate()

  const [ownerData, setOwnerData] = React.useState<OwnerDexieModel | undefined>(
    undefined
  )
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)

  const petState = useAppSelector(selectPet)
  const petDetail = useAppSelector((state) =>
    selectPetById(state, petId as EntityId)
  )
  const owners = useAppSelector(selectAllOwners)
  const dispatch = useAppDispatch()

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
    if (petId) {
      dispatch(
        updatePet({
          petId,
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

  async function handleDeletePet(petId: string | undefined) {
    if (petId) {
      dispatch(removePet(petId))
      setShowDeleteModal(false)
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
              isPending={petState.status === Status.PENDING}
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
export default PetDetail
