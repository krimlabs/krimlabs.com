import clsx from 'clsx';

function Nav() {
  return (
    <div className={clsx('flex', 'py-4')}>
      <div>
        <a href="/">
          <div className="">
            Shivek Khurana (formerly Krim Labs)
            <img
              src={'/img/logo.svg'}
              alt="Krim Labs Logo Purple"
              className="h-4"
            />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Nav;
