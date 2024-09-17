const Button = ({ text, style }) => {
  return (
    <div className="w-full">
      <button
        className={`font-bold w-full h-10 text-[16px] md:text-[18px] text-white flex items-center justify-center rounded-[12px] bg-gradient-to-br from-customGreen via-customBlue to-customPurple ${style} `}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
