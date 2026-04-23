import { Edit2, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const CompaniesTable = () => {
    // console.log(useSelector((store) => store.company));
    const { allCompanies,searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany,setFilterCompany] = useState(allCompanies);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredCompany = allCompanies.length>=0 && allCompanies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    },[allCompanies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>List of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        
                                    filterCompany?.map((company) => {
                                        return (
                                                <tr>
                                                    <TableCell>
                                                        <Avatar>
                                                            <AvatarImage src={company.logo} />
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>{company.name}</TableCell>
                                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                                    <TableCell>
                                                        <Popover>
                                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                            <PopoverContent className='w-32'>
                                                                <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                                    <Edit2 className='w-4' />
                                                                    <span>Edit</span>
                                                                </div>

                                                            </PopoverContent>
                                                        </Popover>
                                                    </TableCell>
                                                </tr>
                                        )
                                    })
                                }

                    
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable