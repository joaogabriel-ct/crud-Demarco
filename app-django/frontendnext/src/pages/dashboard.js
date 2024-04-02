import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Appointment from "@/components/table";
import { api } from "@/service/api";
import { useRouter } from "next/router";

function Dashboard({ session }) {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("empregados/");
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar empregados:", error);
    }
  };

  const handleAddEmployee = () => {
    if (!session) {
      Swal.fire({
        title: "Usuário não autenticado",
        text: "Faça login para adicionar um empregado.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/login"); // Redireciona para a página de login
      });
    } else {
      console.log("Abrir modal de adição de empregados...");
    }
  };

  return (
    <div className="container mt-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-full sm:max-w-md lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl bg-white border rounded-md overflow-y-auto">
      <div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
          onClick={handleAddEmployee}
        >
          Adicionar Empregado
        </button>
        <Appointment salesData={data} />
      </div>
    </div>
  );
}

export default Dashboard;
