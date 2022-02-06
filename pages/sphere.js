import { useGlobalState } from './state';
import Image from 'next/image'
import SphereInGame from './Images/SphereInGame.png';

export default function Sphere() {
    const [currentCollection] = useGlobalState('currentCollection');

    return (
        <div>
            <Image src={SphereInGame} class="h-screen"/>
        </div>
    )
}
