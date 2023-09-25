const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return ( 
      <div className="h-screen flex items-center justify-center px-4 md:px-0">
        {children}
      </div>
     );
  }
   
export default AuthLayout;