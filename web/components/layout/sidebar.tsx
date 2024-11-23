'use client';

import { defaultLinks, superAdminLinks } from '@/lib/data/sidebar.data';
import { useAuthContext } from '@/lib/providers/contexts/auth-context';
import { useDashboardContext } from '@/lib/providers/contexts/dashboard-context';
import { authService } from '@/lib/services/auth.service';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { BiArrowToRight, BiLogOut } from 'react-icons/bi';
import { FcLink } from 'react-icons/fc';
import { toast } from 'sonner';
import CircleLoader from '../common/loader';
import { AdminPermissions } from '@/lib/schemas/enums';

const DashboardSidebar = () => {
  const { user } = useAuthContext();
  const { setPage } = useDashboardContext();
  const pathname = usePathname();
  const router = useRouter();

  const links = useMemo(
    () =>
      user?.admin?.permission === AdminPermissions.SuperAdmin
        ? superAdminLinks
        : defaultLinks,
    [user]
  );

  const { isPending: loggingOut, mutateAsync: logOut } = useMutation({
    mutationKey: ['useLogOut'],
    mutationFn: authService.logOut,
    onSuccess() {
      router.push('/');
      toast.success('Logged Out Successfully');
    },
  });

  return (
    <div className="w-[280px] max-h-screen bg-white p-4">
      <header className="flex items-center">
        <div>
          <Image
            src={'/logo/logo-black.png'}
            width={100}
            height={80}
            alt="logo"
          />
        </div>
        <FcLink />
        <div className="ml-6">
          <Image
            src={user?.school?.logo!}
            alt="school logo"
            width={100}
            height={80}
            className="w-[70px] h-[70px] object-contain"
          />
        </div>
      </header>

      <ul className="mt-12 mb-8 space-y-5 overflow-y-scroll">
        {links.map((link, index) => {
          const isSelected = pathname == link.route;

          const className = cn(
            'px-4 py-3 text-[.9rem] flex items-center gap-3',
            isSelected && 'bg-mainLight text-white',
            !isSelected && 'hover:bg-mainExtraLight'
          );

          return (
            <li key={index}>
              <Link className={className} href={link.route}>
                <span className="text-[1.6rem]">{link.icon}</span>
                {link.routeName}
              </Link>
            </li>
          );
        })}

        <div
          onClick={() => {
            if (!loggingOut) {
              logOut();
            }
          }}
          className="px-4 py-3 text-[.9rem] flex items-center gap-3 max-w-fit cursor-pointer hover:text-mainLight"
        >
          {loggingOut ? (
            <CircleLoader />
          ) : (
            <>
              <span className="text-[1.6rem]">
                <BiLogOut />
              </span>
              <p>Sign Out</p>
            </>
          )}
        </div>
      </ul>

      <Link
        href={'/dashboard/profile'}
        className="flex items-start gap-3 justify-between bg-mainLight p-4 cursor-pointer"
      >
        <Image
          src={user?.profilePicture!}
          width={40}
          height={40}
          alt="Profile Picture"
          className="rounded-full border-2 border-mainExtraLight"
        />

        <div className="text-white">
          <h4 className="w-full overflow-ellipsis text-white text-[.9rem] font-bold capitalize">
            {user?.firstName} {user?.lastName}
          </h4>
          <p className="text-[.7rem] capitalize">{user?.admin?.permission}</p>
          {user?.admin?.department && (
            <p className="text-[.7rem] capitalize">
              Dept. - {user?.admin?.department?.unionName ?? 'CSC'}
            </p>
          )}
        </div>

        <span className="block self-center">
          <BiArrowToRight color="white" size={26} />
        </span>
      </Link>
    </div>
  );
};

export default DashboardSidebar;
