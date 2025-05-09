import { DonationPack, DonationDescription, CallToAction } from "../components/DonationCp";
import { Title } from "../components/common/TitleCp";
export default function Donation() {
    return(
        <div>
            <Title title="Donacion "/>
            <DonationDescription/>
            
            <DonationPack
                packNumber={10}
                price={10}
                description="Apóyanos con un pequeño aporte mensual para alimentar y cuidar a los rescatados."
                bulletinFrequency={3}
                additionalPerks="Además, recibirás fotos exclusivas."
                image="/images/pack10.jpg"
            />
        {/* <CallToAction /> */}
      </div>
    )
}