import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const EmployeeModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    cargo: '',
    dataAdmissao: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Aqui você pode enviar os dados do empregado para onde for necessário, como um endpoint de API, por exemplo.
    console.log(formData);
    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Adicionar Empregado</DialogTitle>
      <DialogContent>
        <input type="text" placeholder="CPF" name="cpf" value={formData.cpf} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <input type="text" placeholder="Nome" name="nome" value={formData.nome} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <input type="text" placeholder="Cargo" name="cargo" value={formData.cargo} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <input type="date" placeholder="Data de Admissão" name="dataAdmissao" value={formData.dataAdmissao} onChange={handleInputChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
        <Button onClick={handleClose} color="secondary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeModal;
