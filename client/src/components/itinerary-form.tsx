// src/components/itinerary-form.tsx
"use strict"; // Important: Must be the very first line

import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
// Import necessary types from react-hook-form
import { useForm, ControllerRenderProps, FieldValues, FieldPath } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarCheck2, MapPin, Heart, Send } from "lucide-react"; // Icons

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
// import { CITIES, PREFERENCES } from "@/config/site"; // Import constants
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const SITE_NAME = "Musafir";
const CITIES = ["Goa", "Kerala", "Himachal", "Uttarakhand", "Rajasthan"];
export const PREFERENCES = [
  "Historic",
  "Adventure",
  "Nature",
  "Religious",
  "Beach",
  "Mountain",
  "Shopping",
];


type pref = {
    name: string;
    value: string;
  };
  
// Define Zod schema for validation (no changes needed here)
const formSchema = z.object({
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  city: z.string({
    required_error: "Please select a destination city.",
  }).min(1, "Please select a city."),
  preferences: z.array(z.string())
    // CHANGE HERE: Use min(1) instead of nonempty()
    .min(1, {
      message: "Select at least one preference.",
    }),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date cannot be earlier than start date.",
  path: ["endDate"],
});

// Define the type based on the schema
export type ItineraryFormData = z.infer<typeof formSchema>;

interface ItineraryFormProps {
  onSubmit: (data: ItineraryFormData) => void;
  isLoading?: boolean;
}

export function ItineraryForm({ onSubmit, isLoading = false }: ItineraryFormProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const form = useForm<ItineraryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      city: "",
      preferences: [],
    },
  });

  const handleFormSubmit = (values: ItineraryFormData) => {
    console.log("Form Submitted:", values);
    onSubmit(values);
  };

  const handlePreferenceChange = (value: string) => {
      const newPreferences = selectedPreferences.includes(value)
        ? selectedPreferences.filter((p) => p !== value)
        : [...selectedPreferences, value];
      setSelectedPreferences(newPreferences);
      // Update react-hook-form state correctly for the array
      form.setValue("preferences", newPreferences, { shouldValidate: true });
  };

  const disablePastDates = (date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0));

  const startDate = form.watch("startDate");
  const disableDatesBeforeStart = (date: Date) => {
      if (!startDate) return disablePastDates(date);
      const startOfDayForStartDate = new Date(new Date(startDate).setHours(0, 0, 0, 0)); // Use new Date() to avoid mutating watched value
      return date < startOfDayForStartDate;
  }

  // Define a reusable type for the render prop field argument
  // This uses generics to ensure the field name is correctly linked to the main form data type
  type FormFieldRenderProps<TFieldName extends FieldPath<ItineraryFormData>> = {
    field: ControllerRenderProps<ItineraryFormData, TFieldName>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Craft Your Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date - Explicitly type 'field' */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }: FormFieldRenderProps<'startDate'>) => ( // Use the defined type
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-gray-700 mb-1">Start Date</FormLabel>
                      {/* Pass field.onChange directly to setDate */}
                      <DatePicker
                         date={field.value}
                         setDate={field.onChange}
                         placeholder="Select start date"
                         disabled={disablePastDates}
                       />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Date - Explicitly type 'field' */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }: FormFieldRenderProps<'endDate'>) => ( // Use the defined type
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-gray-700 mb-1">End Date</FormLabel>
                       <DatePicker
                         date={field.value}
                         setDate={field.onChange}
                         placeholder="Select end date"
                         disabled={disableDatesBeforeStart}
                       />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* City Selection - Explicitly type 'field' */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }: FormFieldRenderProps<'city'>) => ( // Use the defined type
                  <FormItem>
                    <FormLabel className="text-gray-700">Destination</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}> {/* Add value prop */}
                      <FormControl>
                        {/* Pass field.ref to the trigger for focus management etc. */}
                        <SelectTrigger ref={field.ref}>
                          <MapPin className="inline-block mr-2 h-4 w-4 text-gray-500" />
                          <SelectValue placeholder="Select your destination city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferences Selection - Explicitly type 'field' */}
               <FormField
                control={form.control}
                name="preferences"
                // Even though field isn't spread onto the buttons, RHF needs it typed correctly
                render={({ field }: FormFieldRenderProps<'preferences'>) => ( // Use the defined type
                  <FormItem>
                    <FormLabel className="text-gray-700">Your Interests</FormLabel>
                    <FormControl>
                       <div className="flex flex-wrap gap-2 pt-1">
                          {PREFERENCES.map((pref) => (
                            <Button
                              key={pref}
                              type="button"
                              variant={selectedPreferences.includes(pref) ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePreferenceChange(pref)}
                              // Pass field.ref here if you want RHF to manage focus on the group,
                              // but it's complex for a button group. Usually not needed.
                              // ref={field.ref} // Optional: may or may not be desired behavior
                              className={`transition-colors duration-200 ${
                                selectedPreferences.includes(pref)
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                              }`}
                            >
                              {pref}
                            </Button>
                          ))}
                       </div>
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />


              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 text-lg font-semibold shadow-md" disabled={isLoading}>
                   {isLoading ? 'Generating...' : (
                    <>
                      <Send className="mr-2 h-5 w-5" /> Generate My Itinerary
                    </>
                   )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}