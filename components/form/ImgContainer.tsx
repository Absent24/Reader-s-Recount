"use client";
import Image from "next/image";
import { useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { Button } from "../ui/button";
import { actionType } from "@/utils/types";
import FormContainer from "./FormContainer";
import ImgInputField from "./ImgInputField";
import { SubmitBtn } from "./Buttons";

type ImgContainerProps = {
  image: string;
  alt: string;
  action: actionType;
  btnText: string;
  children?: React.ReactNode;
};

function ImgContainer(props: ImgContainerProps) {
  const { image, alt, action, btnText } = props;
  const [isVisible, setIsVisible] = useState(false);

  const userIcon = <LuUser2 className="w-24 h-24 bg-primary text-white mb-4" />;

  return (
    <div>
      {image ? (
        <Image
          src={image}
          alt={alt}
          width={100}
          height={100}
          className="rounded object-cover mb-4 w-24 h-24"></Image>
      ) : (
        userIcon
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible((prev) => !prev)}>
        {btnText}
      </Button>
      {isVisible && (
        <div className="max-w-lg mt-4">
          <FormContainer action={action}>
            {props.children}
            <div className="flex flex-row gap-4">
              <ImgInputField />
              <SubmitBtn
                size="sm"
                className="mt-7"
              />
            </div>
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default ImgContainer;
