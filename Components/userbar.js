import classNames from "classnames";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

function Userbar(prop) {
    const user = [
        { name: 'Ravi', href: '#' },
    ]
    return (
        <>
            <Fragment>
                <div className="userbar-background">
                    <Menu as="div" className="relative">
                        <div>
                            <div className="flex text-lg justify-end pr-5 text-left mr-2">
                                {user.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'text-white' : 'text-white',
                                            'px-3 py-2 text-sm font-medium user-navigation'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        <small>Welcome</small> <b>{item.name}</b>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Menu>
                </div>
            </Fragment>
        </>
    );
}
export default Userbar;