"use client";
import React from "react";
import { BarLoader } from "react-spinners";

interface LoadingBannerProps {
  loading: boolean;
}

export const LoadingBanner: React.FC<LoadingBannerProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 z-[2000000] w-full h-1">
          <BarLoader
            color="#9dd02f"
            className="z-50 w-full h-full"
            width="100%"
          />
        </div>
      )}
    </>
  );
};
