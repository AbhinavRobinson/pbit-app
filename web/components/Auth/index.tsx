export type AuthProps = {}

export default function Auth<AuthProps>(): JSX.Element {
	return (
		<div className='flex p-2 border rounded w-max text-gray-500 hover:border-gray-500'>
			<a href='http://localhost:3001/auth/google'>Login with Google</a>
		</div>
	)
}
