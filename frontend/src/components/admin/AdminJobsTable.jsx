import store from '@/redux/store'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const AdminJobsTable = () => {
    const{allAdminJobs,searchJobByText} = useSelector((store)=>store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJob);
    }, [allAdminJobs, searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>List of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        filterJobs?.map((job) => {
                            return (
                                <tr>
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className='w-32 bg-white'>
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
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

export default AdminJobsTable