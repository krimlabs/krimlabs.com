import logo from '@src/img/logo.svg';
import clsx from 'clsx';

function Nav() {
  return (
    <div className={clsx('flex', 'py-4')}>
      <div>
        <div className="">
          <img src={logo.src} alt="Krim Labs Logo Purple" width={216} />
        </div>
        <div className="font-bold text-gray-600">{`kr-eee-mm`}</div>
      </div>
    </div>
  );
}

export default Nav;
