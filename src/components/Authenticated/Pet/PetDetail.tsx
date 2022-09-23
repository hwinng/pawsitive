import type { EntityId } from '@reduxjs/toolkit'
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchPetDetail, selectPetById } from '../../../store/petSlice'
import type { BreadcrumbItemm } from '../../../types/types'
import CustomBreadcrumnb from '../../Common/Breadcrumb'
import Button from '../../Common/Button'
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
            <RowItem field="Owner Id" value={petDetail?.owner} />
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
