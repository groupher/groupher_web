/*
   this page is for /explore
 */
export const getServerSideProps = async (context) => {
  return {
    redirect: {
      permanent: false,
      destination: '/home',
    },
  }
}

const HomePage = () => <div>home</div>

export default HomePage
