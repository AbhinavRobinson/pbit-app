import CardTable from 'components/Cards/CardTable'
import DashboardLayout from 'layouts/Dashboard'
import { useRouter } from 'next/router'

function Invoices() {
	const Router  = useRouter()
	const createInvoiceHandler = () => {
		Router.push('/invoice/create')
	}

	return (
		<DashboardLayout>
			{/* <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
				<div className='rounded-t mb-0 px-4 py-3 border-0'>
					List of invoices
				</div>
			</div> */}
			<CardTable color='light' />
			<hr />
			<div className='text-center mt-6'>
				<button
					className='bg-red-500 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/2 ease-linear transition-all duration-150'
					type='button'
					onClick={createInvoiceHandler}
				>
					Create Invoice
				</button>
			</div>
		</DashboardLayout>
	)
}

export default Invoices
