import { useSession } from '@/service/auth/session';
import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import EmployeeModal from '@/components/employeeModal'; // Importe o modal de empregado

const DateInputWrapper = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  margin-right: 8px;

  label {
    margin-right: 10px;
  }

  input[type="date"] {
    border: none;
    outline: none;
    padding: 4px;
    margin-right: 4px;
  }
`;

const DateInput = ({ label, value, onChange }) => {
    return (
        <DateInputWrapper>
            <label>{label}</label>
            <input type="date" value={value} onChange={onChange} />
        </DateInputWrapper>
    );
};


const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("pt-BR", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',

    });
};

export default function AppointmentAdmin({ salesData }) {
    const [filterText, setFilterText] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { data: session } = useSession();
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false); 

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
    };
    const Columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
            sortable: true,
            cell: row => <a > {row.nome}</a>
        },
        {
            name: 'CPF',
            selector: row => row.cpf,
            sortable: true,
            cell: row => <a >{row.cpf}</a>
        },
        {
            name: 'Data de Admissão',
            selector: row => formatDate(row.data_admissao),
            sortable: true,
            cell: row => (
                <a>
                    {formatDate(row.data_admissao)}
                </a>
            )
        },
       
        {
            name: 'Cargo',
            selector: row => row.cargo,
            sortable: true,
            cell: row => <a>
                {row.cargo}
            </a>
        },
    ];
    
    const filteredItems = useMemo(() => {
        return salesData.filter(item => {
            const matchesCampaignName = item.nome.toLowerCase().includes(filterText.toLowerCase());
            const itemDate = new Date(item.data_admissao).getTime();
            const start = startDate ? new Date(startDate).getTime() : null;
            const matchesStartDate = start ? itemDate >= start : true;
            return matchesCampaignName  && matchesStartDate ;
        });
    }, [filterText, statusFilter, startDate, endDate, salesData]);

    const handleOpenEmployeeModal = () => {
        if (session) {
            setIsEmployeeModalOpen(true);
        } else {
            console.log('Usuário não autenticado. Faça login para acessar esta funcionalidade.');
        }
    };

    const handleCloseEmployeeModal = () => {
        setIsEmployeeModalOpen(false);
    };

    return (
        <div className="p-4 m-8">
            <h2 className="text-xl font-semibold text-center mb-4">Empregados</h2>
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="px-2 w-full sm:w-1/2 lg:w-1/4">
                    <input
                        type="text"
                        placeholder="Buscar por nome da campanha..."
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="px-2 w-full sm:w-1/2 lg:w-1/4">
                    <DateInput label="De" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
            </div>
            {session && (
                <button className="bg-blue-600" onClick={handleOpenEmployeeModal}>
                    Adicionar Empregado
                </button>
            )}
            <EmployeeModal show={isEmployeeModalOpen} handleClose={handleCloseEmployeeModal} />
            <DataTable
                columns={Columns}
                data={filteredItems}
                customStyles={customStyles}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10]}
            />
        </div >
    );
}
