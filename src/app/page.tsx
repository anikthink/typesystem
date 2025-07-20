"use client";

import React from 'react';
import { TypographyBuilder } from '@/components/TypographyBuilder';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen max-h-screen flex">
      <TypographyBuilder />
      <Toaster />
    </div>
  );
}