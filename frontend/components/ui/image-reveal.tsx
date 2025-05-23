import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

export default function ImageReveal({ firstImage, secondImage }: { firstImage: string, secondImage: string }) {

    const FIRST_IMAGE = {
        imageUrl: firstImage,
    };
    const SECOND_IMAGE = {
        imageUrl: secondImage,
    };

  return (
    <ReactBeforeSliderComponent
        firstImage={FIRST_IMAGE}
        secondImage={SECOND_IMAGE}
    />
  )
}
