const NavBar = () => {
  return (
    <div className="flex h-[3.75rem] items-center justify-end bg-white px-3 shadow-[0_2px_10px_0_rgba(48,75,127,0.20)]">
      <div className="flex gap-4 text-darkBlue-100">
        <a href="/">
          {/* Truck SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-8"
            viewBox="0 0 36 24"
          >
            <path
              d="M10.343 19.1366H6.67871"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.01465 1.31738H22.4153C23.6439 1.31738 24.6481 2.3216 24.6481 3.55017V7.18245C24.6481 8.41102 25.6523 9.41524 26.8809 9.41524H31.7204C32.3721 9.41524 32.9917 9.70369 33.4083 10.1951L34.4553 11.413C34.8078 11.819 35.0001 12.3318 35.0001 12.8659V16.9042C35.0001 17.6733 34.6155 18.3464 34.0173 18.7523"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.5202 19.1366H17.3945"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.6061 5.54788H7.28809"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.4674 5.54788H3.86914"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.6064 9.83154H12.1172"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.1469 9.83159H0.910156"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.525 14.1153H5.71753"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.0215 3.56042H28.3653C29.1986 3.56042 29.9678 4.03049 30.3524 4.76763L32.7561 9.41481"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.8682 22.6622C15.8153 22.6622 17.3937 21.0838 17.3937 19.1368C17.3937 17.1897 15.8153 15.6113 13.8682 15.6113C11.9212 15.6113 10.3428 17.1897 10.3428 19.1368C10.3428 21.0838 11.9212 22.6622 13.8682 22.6622Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28.0557 22.6622C30.0028 22.6622 31.5812 21.0838 31.5812 19.1368C31.5812 17.1897 30.0028 15.6113 28.0557 15.6113C26.1087 15.6113 24.5303 17.1897 24.5303 19.1368C24.5303 21.0838 26.1087 22.6622 28.0557 22.6622Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a href="/">
          {/* Question Blob SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeWidth={0.25}
            stroke="currentColor"
            className="h-5 w-8"
            viewBox="0 0 27 27"
          >
            <path
              d="M0.94043 7.87272V5.16361C0.94043 2.86122 2.80854 1 5.11094 1H22.5443C24.4883 1 26.06 2.57859 26.06 4.51563V16.393C26.06 18.2197 24.5848 19.7087 22.7511 19.7087H11.1978C9.58475 19.7087 8.01995 20.267 6.76535 21.2873L1.87793 25.2579C1.50569 25.5681 0.94043 25.2992 0.94043 24.8167V10.83"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.9561 13.3039C12.9561 12.4216 13.6454 11.5254 14.445 11.1946C17.7125 9.85034 17.6229 4.32873 13.2801 4.31494C12.1289 4.31494 10.888 4.72854 10.2607 5.99693"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.0041 16.6884C13.4874 16.6884 13.8793 16.2965 13.8793 15.8132C13.8793 15.3298 13.4874 14.938 13.0041 14.938C12.5207 14.938 12.1289 15.3298 12.1289 15.8132C12.1289 16.2965 12.5207 16.6884 13.0041 16.6884Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
      <div className="ml-[1.37rem] mr-[0.87rem] h-12 w-px bg-[#d0d1d7]" />
      <div className="flex gap-16">
        <span className="text-sm/9 font-semibold">Tecnofull</span>
        <div className="h-9 w-9 rounded-full bg-[#bf8948]" />
      </div>
    </div>
  );
};

export default NavBar;
