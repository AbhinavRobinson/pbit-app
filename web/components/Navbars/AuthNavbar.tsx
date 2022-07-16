import React from 'react'
import Link from 'next/link'
// components

import PagesDropdown from 'components/Dropdowns/PagesDropdown'

export default function Navbar(props: any) {
	const [navbarOpen, setNavbarOpen] = React.useState(false)
	return (
		<>
			<nav className='top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg'>
				<div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
					<div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
						<Link href='/'>
							<span className='text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap'>
								dIMS
							</span>
						</Link>
						<button
							className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
							type='button'
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<i className='text-white fas fa-bars'></i>
						</button>
					</div>
					<div
						className={
							'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' +
							(navbarOpen
								? ' block rounded shadow-lg'
								: ' hidden')
						}
						id='example-navbar-warning'
					>
						<ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
							<li className='flex items-center'>
								<Link href='/auth/login'>
									<span className='cursor-pointer bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'>
										<i className='fas fa-sign-in'></i> Sign
										In
									</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
