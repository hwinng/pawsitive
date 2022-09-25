import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useAsync } from '../../../hooks/useAsync'
import { PetSize, PetType } from '../../../types/enum'
import type { Option, OwnerDexieModel } from '../../../types/types'
import ErrorMessage from '../../Common/ErrorMessage'
import { FormWrapper } from '../../Common/Form'
import InputField from '../../Common/InputField'
import SelectField from '../../Common/Select'
import Spinner from '../../Common/Spinner'

const AddPetForm: React.FC<{
  owners: OwnerDexieModel[] | []
  submitButton: React.ReactElement
  isPending: boolean
  onSubmit: (data: any) => Promise<boolean>
}> = ({ owners, submitButton, isPending, onSubmit }) => {
  console.log({ isPending })
  const ownerOptions: Array<Option<string>> = React.useMemo(() => {
    return owners.map((owner: OwnerDexieModel) => ({
      label: owner.name,
      value: owner.id,
    }))
  }, [owners])
  const sizeOptions: Array<Option<PetSize, PetSize>> = React.useMemo(() => {
    const sizes = Object.values(PetSize)
    return sizes.map((size) => ({ label: size, value: size }))
  }, [PetSize])
  const typeOptions: Array<Option<PetType, PetType>> = React.useMemo(() => {
    const types = Object.values(PetType)
    return types.map((type) => ({ label: type, value: type }))
  }, [PetType])

  const { isRejected, error } = useAsync()
  const validationSchema = Yup.object().shape({
    owner: Yup.string().required('Owner is required'),
    name: Yup.string().required('Pet name is required'),
    breed: Yup.string().required('Breed is required'),
    size: Yup.string().required('Size is required'),
    type: Yup.string().required('Type is required'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  return (
    <FormWrapper
      id="addPetForm"
      onSubmit={handleSubmit(onSubmit)}
      style={{ margin: 'auto', paddingBottom: '2rem' }}
    >
      <SelectField
        name="owner"
        label="Owner"
        register={register}
        options={ownerOptions}
        mode="add"
        error={errors.owner?.message}
      />
      <InputField
        name="name"
        label="Pet Name"
        type="text"
        register={register}
        error={errors.name?.message}
      />
      <SelectField
        name="type"
        label="Type"
        register={register}
        options={typeOptions}
        mode="add"
        error={errors.type?.message}
      />
      <InputField
        name="breed"
        label="Breed"
        type="text"
        register={register}
        error={errors.breed?.message}
      />
      <SelectField
        name="size"
        label="Size"
        register={register}
        options={sizeOptions}
        mode="add"
        error={errors.size?.message}
      />
      <>
        {React.cloneElement(
          submitButton,
          { type: 'submit', form: 'addPetForm' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isPending ? <Spinner style={{ marginLeft: 5 }} /> : null
        )}
      </>
      {isRejected ? <ErrorMessage error={error} /> : null}
    </FormWrapper>
  )
}

export default AddPetForm
