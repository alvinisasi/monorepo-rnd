'use client'

import Hero from "@/components/hero";

const Home = () => {
	// const queryClient = getQueryClient()
  	// await queryClient.prefetchQuery({ queryKey: ['links'], queryFn: getLinks })
  	// const dehydratedState = dehydrate(queryClient)
    // const links = await builder.getAll("nav-link", { prerender: false });
	
    return (
        <>
			<Hero />
            {/* <RestOfYourPage /> */}
        </>
    );
}

export default Home
