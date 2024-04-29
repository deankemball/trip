import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type NameFormProps = {
  nameEntered: boolean;
  setNameEntered: Dispatch<SetStateAction<boolean>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string>>;
  socket: WebSocket | null;
  submitName: (e: React.FormEvent<HTMLFormElement>) => void;
};
const NameForm = ({
  setNameEntered,
  setId,
  socket,
  name,
  nameEntered,
  setName,
  submitName,
}: NameFormProps) => {
  const { t } = useTranslation();
  return (
    <form
      action=""
      onSubmit={(e) => submitName(e)}
      className="w-full flex gap-2"
    >
      <input
        className="w-full h-12 rounded-md px-4 bg-white/20 placeholder:text-white border-2 border-white"
        name="name"
        type="text"
        disabled={nameEntered}
        placeholder={t("instructions.input.placeholder")}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        disabled={nameEntered}
        className={clsx(
          nameEntered ? "opacity-25" : "opacity-100",
          "h-12 aspect-square bg-white/20 border-2 border-white rounded-md"
        )}
      >
        ok
      </button>
    </form>
  );
};

export default NameForm;
