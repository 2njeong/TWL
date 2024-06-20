import Link from 'next/link';

const NavBar = () => {
  const navBarList = ['홈', 'Quiz', 'Algorithm', 'Todo'];
  const quizNavList = ['문제 풀기', '문제 만들기'];
  return (
    <>
      {navBarList.map((item) => {
        return <div key={item}>{/* <Link href>{item}</Link> */}</div>;
      })}
    </>
  );
};

export default NavBar;
