"use client";
import { FormEvent, useState } from "react";
import { Suspense } from "react";
interface Messages {
  role: string;
  content: string;
}
export default function Home() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [pieces, setPieces] = useState("");
  const handleSubmit = async (e: FormEvent<FormData>) => {
    e.preventDefault();
    setPieces("");
    const messagesToSend = [...messages, { role: "user", content: pieces }];
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesToSend,
        }),
      });
      const data = await response.json();

      console.log("Resposta do Agente:", data);
      setMessages((oldMessage) => [
        ...oldMessage,
        { role: "assistant", content: data.choices[0].message.content },
      ]);
    } catch (error) {
      console.log("messages", JSON.stringify(messages));
      console.error("Erro ao enviar solicitação:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          IA Agente de Peças
        </h1>
        <div className="mb-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-semibold">
              Lista de Peças
            </label>
            <textarea
              rows={5}
              value={pieces}
              onChange={(e) => setPieces(e.target.value)}
              placeholder="Insira uma lista de peças"
              className="w-full p-4 border border-gray-300 text-gray-800 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={async (e) => handleSubmit(e)}
            disabled={!pieces}
            className="disabled:bg-slate-400 w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar para o Agente
          </button>
        </div>
        {messages && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Resposta da IA:
            </h2>
            <Suspense fallback={<p>...</p>}>
              {messages.map((message, index) => (
                <p
                  className="text-gray-700 whitespace-pre-wrap mt-4"
                  key={message?.content + index}
                >
                  <span className="text-lg font-bold">
                    {message.role === "user" ? "Usuário: " : "Agente: "}
                  </span>
                  {message.content}
                </p>
              ))}
            </Suspense>

             
          </div>
        )}
      </div>
    </div>
  );
}
// preciso de um notebook para acessar a internet