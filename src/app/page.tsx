import Image from "next/image";
import Logo from "../../public/logo.svg";
import ProfileImage from "../../public/images/profile-image.avif";
import Avatar from "@/common/Avatar";

export default function Home() {
  return (
    <main className="m-10 md:m-20">
        <div className="flex justify-between">
            <Image src={Logo} alt="taski-logo"/>
            <Avatar name="John" image={ProfileImage.src}/>
        </div>

        <h1>hey</h1>
      
    </main>
  );
}
