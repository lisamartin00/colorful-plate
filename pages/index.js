import useSWR, { mutate } from 'swr'
import 'tailwindcss/tailwind.css'
import { listFood } from '@/lib/fauna'
import Layout from '@/components/Layout'
import FoodForm from '@/components/FoodForm'
import FoodItem from '@/components/FoodItem'

const FOOD_PATH = '/api/food'

const putFood = (payload) =>
  fetch(FOOD_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)))

const useFoodFlow = ({ initialFoodItems }) => {
  const { data: foodItems } = useSWR(`${FOOD_PATH}/color?=red`, {
    initialData: initialFoodItems,
  })

  const onSubmit = async (payload) => {
    await putFood(payload)
    await mutate(FOOD_PATH)
  }

  return {
    foodItems,
    onSubmit,
  }
}

const FoodList = ({ initialFoodItems }) => {
  const { foodItems, onSubmit } = useFoodFlow({
    initialFoodItems,
  })

  return (
    <Layout pageTitle='Home'>    
      <FoodForm onSubmit={onSubmit} />
      <div className="mt-4 flex flex-wrap items-center justify-between">
        {foodItems?.map((food) => (
          <FoodItem key={food._id} food={food} />
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => ({
  props: {
    initialFoodItems: await listFood('red'),
  },
  revalidate: 1,
})

export default FoodList
