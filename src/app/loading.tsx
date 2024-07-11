'use client';
import { useAppStore } from '@utils/Store';

export default function Loading() {
  const { isApiLoading } = useAppStore();

  return (
    <>
      {isApiLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
