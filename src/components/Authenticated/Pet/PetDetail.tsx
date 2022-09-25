import type { EntityId } from '@reduxjs/toolkit'
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAsync } from '../../../hooks/useAsync'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchPetDetail, selectPetById } from '../../../store/petSlice'
import type { BreadcrumbItemm } from '../../../types/types'
import { client } from '../../../utils/client-api'
import CustomBreadcrumnb from '../../Common/Breadcrumb'
import Button from '../../Common/Button'
import { ErrorFallback } from '../../Layout/ErrorFallback'
import { FullPageSpinner } from '../../Layout/FullPageSpinner'
import PageHeader from '../../Layout/PageHeader'
import RowItem from '../RowItem'

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
  const {
    run,
    isPending,
    isIdle,
    isRejected,
    data: ownerData,
    error,
  } = useAsync()
  const { petId } = useParams()
  const petDetail = useAppSelector((state) =>
    selectPetById(state, petId as EntityId)
  )
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
      const p = fetchOwnerDetail(petDetail.owner)
      run(p).then(console.log)
    }
  }, [petDetail?.owner])

  if (isIdle || isPending) {
    return <FullPageSpinner />
  }

  if (isRejected) {
    return <ErrorFallback error={error} />
  }

  async function fetchOwnerDetail(ownerId: string) {
    try {
      const res = await client(`/api/owner/${ownerId}`)
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return (
    <React.Fragment>
      <PageHeader title="Pet Detail">
        <Button variant="secondary" onClick={() => console.log('Edit')}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => console.log('delete')}>
          Delete
        </Button>
      </PageHeader>
      <PetDetailLayout>
        <CustomBreadcrumnb items={breadcrumbItems} />
        <div>
          <RowWrapper>
            <RowItem field="Pet Id" value={petId} />
            <RowItem field="Owner Name" value={ownerData?.data.name} />
            <RowItem field="Owner Phone" value={ownerData?.data.phoneNumber} />
            <RowItem field="Pet Name" value={petDetail?.name} />
            <RowItem field="Type" value={petDetail?.type} />
            <RowItem field="Breed" value={petDetail?.breed} />
            <RowItem field="Size" value={petDetail?.size} />
          </RowWrapper>
        </div>
      </PetDetailLayout>
    </React.Fragment>
  )
}

export default PetDetail
