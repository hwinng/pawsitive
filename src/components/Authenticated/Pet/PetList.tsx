import { Skeleton } from '@ahaui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchPets, selectAllPets } from '../../../store/petSlice'
import type { BreadcrumbItemm, PetDexieModel } from '../../../types/types'
import CustomAvatar from '../../Common/Avatar'
import CustomBreadcrumnb from '../../Common/Breadcrumb'
import Button from '../../Common/Button'
import PageHeader from '../../Layout/PageHeader'

const PetListLayout = styled.div`
  padding: 1rem;
`

const DataCell = styled.td<{ withAvatar?: boolean; withAction?: string }>`
  ${(props) =>
    props.withAvatar
      ? css`
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: start;
        `
      : css`
          vertical-align: middle !important;
        `}
`

const PetList = () => {
  const dispatch = useAppDispatch()
  const pets = useAppSelector(selectAllPets)
  const navigate = useNavigate()
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
  }, [])

  function handleView(petId: string) {
    navigate(`/pet/${petId}`)
    return false
  }
  function handleEdit(petId: string) {
    console.log({ petId })
  }
  function handleDelete(petId: string) {
    console.log({ petId })
  }

  return (
    <>
      <PageHeader title="Pet List">
        <Button variant="secondary" onClick={() => console.log('add')}>
          Add
        </Button>
      </PageHeader>
      <PetListLayout>
        <CustomBreadcrumnb items={breadcrumbItems} />
        <div
          className="u-widthFull u-block u-overflowHorizontalAuto"
          style={{ maxHeight: '70vh' }}
        >
          {pets.length ? (
            <table className="Table Table--stickyHeader u-backgroundWhite u-textDark u-text200">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Owner Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Breed</th>
                  <th scope="col">Size</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((item: PetDexieModel, index: number) => (
                  <tr key={item.id}>
                    <DataCell>{index + 1}</DataCell>
                    <DataCell withAvatar>
                      <CustomAvatar isDefault />
                      <span>{item.name}</span>
                    </DataCell>
                    <DataCell>{item.owner}</DataCell>
                    <DataCell>{item.type}</DataCell>
                    <DataCell>{item.breed}</DataCell>
                    <DataCell>{item.size}</DataCell>
                    <DataCell>
                      <Button
                        variant="primary"
                        onClick={() => handleView(item.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleEdit(item.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item.id)}
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
    </>
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
