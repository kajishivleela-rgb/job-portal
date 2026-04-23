import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
import { MoreHorizontal } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import axios from 'axios';


const shortlistedStatus = ['Accepted', 'Rejected'];
const ApplicantsTable = () => {
   
    const {applicants} = useSelector(store=>store.application);
    const statusHandler = async (status,id)=>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/updateStatus/${id}`,{status});
            console.log(res);
            if(res.data.success)
            {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of recent applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.applications.map((item)=>(
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.mobile}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant?.profile?.resume?<a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>:<span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortlistedStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item._id)} className="cursor-pointer">
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>

                            </tr>
                        ))   
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable