import ColorSwatch from '@/components/ColorSwatch'
import COLORS from 'constants/colors'

const FoodItem = ({ food }) => {
  const color = COLORS.find(element => element.name === food.color);
  return (
    <div
      style={{backgroundImage: `url('${food.photoUrl}')`}}
      className="flex flex-col w-3/6 h-96 bg-cover bg-no-repeat bg-center relative"
    >
      <div className="flex bg-black bg-opacity-80 absolute bottom-0 w-full p-2 items-center">
        <ColorSwatch
          color={color}
          isSelected={true}
        />
        <div className="text-white">{food.name}</div>
      </div>
    </div>
  );
}

export default FoodItem;
