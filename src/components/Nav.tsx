import clsx from 'clsx';

function Nav() {
  return (
    <div className={clsx('flex', 'py-4')}>
      <div>
        <a href="/">
          <div className="">
            <img
              src={'/img/logo.svg'}
              alt="Krim Labs Logo Purple"
              width={80}
              height={23.15}
            />
          </div>
        </a>
        <div className="text-gray-500 text-sm">{`kr-eee-mm`}</div>
      </div>
    </div>
  );
}

export default Nav;
