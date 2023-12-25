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
              width={216}
            />
          </div>
        </a>
        <div className="font-bold text-gray-600">{`kr-eee-mm`}</div>
      </div>
    </div>
  );
}

export default Nav;
