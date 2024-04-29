import React from "react";

type QuitFormProps = {
  socket: WebSocket | null;
  name: string;
  id: string;
  submitQuit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const QuitForm = ({ socket, name, id, submitQuit }: QuitFormProps) => {
  return (
    <form
      className="w-full flex gap-2 items-center h-full"
      action=""
      onSubmit={(e) => submitQuit(e)}
    >
      <p className="w-full h-12 flex items-center text-xl">{name}</p>
      <button
        type="submit"
        className="h-12 aspect-square bg-white/20 border-2 border-white rounded-md"
      >
        quit
      </button>
    </form>
  );
};

export default QuitForm;
