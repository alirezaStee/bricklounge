import CategorySlider from './components/menu/CategorySlider';
import ItemSlider from './components/menu/ItemSlider';

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-[250px_250px_0_0/90px_90px_0_0] bg-[#3f9369]">
      <CategorySlider />
      <ItemSlider />
    </div>
  );
}
