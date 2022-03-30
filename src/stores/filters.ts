import { writable } from "svelte/store";
import { Tag } from "../types";

export const activeFilters = writable<Tag[]>([])