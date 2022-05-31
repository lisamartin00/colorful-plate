import cn from 'classnames'
import { useState } from 'react'
import ColorPicker from '@/components/ColorPicker'
import SuccessMessage from '@/components/SuccessMessage'
import ErrorMessage from '@/components/ErrorMessage'
import LoadingSpinner from '@/components/LoadingSpinner'

const FoodForm = ({ onSubmit: onSubmitProp }) => {
  const initial = {
    name: '',
    color: 'red',
    photoUrl: '',
  }
  const [values, setValues] = useState(initial)
  const [formState, setFormState] = useState('initial')
  const isSubmitting = formState === 'submitting'

  const onSubmit = (ev) => {
    ev.preventDefault()

    setFormState('submitting')
    onSubmitProp(values)
      .then(() => {
        setValues(initial)
        setFormState('submitted')
      })
      .catch(() => {
        setFormState('failed')
      })
  }

  const makeOnChange =
    (fieldName) =>
    ({ target: { value } }) =>
      setValues({
        ...values,
        [fieldName]: value,
      })

  const handleSelectColor = (color) => 
    setValues({
      ...values,
      'color': color,
    });

  const inputClasses = cn(
    'block py-2 my-4 mr-4 bg-white dark:bg-gray-800 flex-grow',
    'rounded-md border-gray-300 focus:ring-blue-500',
    'focus:border-blue-500 text-gray-900 dark:text-gray-100'
  )

  return (
    <div
      className={cn(
        'border border-blue-200 rounded p-6',
        'my-4 w-full dark:border-gray-800 bg-blue-50',
        'dark:bg-blue-opaque'
      )}
    >
    <h5
      className={cn(
        'text-lg md:text-xl font-bold',
        'text-gray-900 dark:text-gray-100'
      )}
    >
      Add a Food
    </h5>
    <form 
      className="flex relative my-4 items-center justify-between flex-wrap"
      onSubmit={onSubmit}
    >
      <input
        required
        className={cn(inputClasses, 'mr-2 px-4')}
        aria-label="Food Name"
        placeholder="Food name..."
        value={values.name}
        onChange={makeOnChange('name')}
      />
      <ColorPicker onClick={handleSelectColor} selectedColor={values.color} />
      <input
        required
        className={cn(inputClasses, 'pl-4 pr-32')}
        aria-label="Food Photo Url"
        placeholder="Food photo URL..."
        value={values.photoUrl}
        onChange={makeOnChange('photoUrl')}
      />
      <button
        className={cn(
          'flex items-center justify-center',
          'px-4 font-bold h-10',
          'bg-gray-200 dark:bg-gray-700 text-gray-900',
          'dark:text-gray-100 rounded w-28'
        )}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoadingSpinner /> : 'Add'}
      </button>
    </form>
      {{
        failed: () => <ErrorMessage>Something went wrong. :(</ErrorMessage>,

        submitted: () => (
          <SuccessMessage>Your food has been added.</SuccessMessage>
        ),
      }[formState]?.()}
    </div>
  )
}

export default FoodForm;
