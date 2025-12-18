/* eslint-disable prettier/prettier */
import {
  Heart,
  Leaf,
  Users,
  Calendar,
  Dumbbell,
  Brain,
  Smile,
  HandHeart,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Activity,
  Flower,
  Sun,
  Moon,
  Star,
  Clock,
  MapPin,
  Home,
  Coffee,

  // NEW (20)
  CheckCircle,
  Award,
  Briefcase,
  GraduationCap,
  UserCheck,
  Baby,
  PersonStanding,
  Accessibility,
  Eye,
  Ear,
  Droplets,
  Flame,
  Wind,
  TreePine,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Settings,
} from "lucide-react";

export const ICON_MAP = {
  // original 20
  heart: Heart,
  leaf: Leaf,
  users: Users,
  calendar: Calendar,
  dumbbell: Dumbbell,

  brain: Brain,
  smile: Smile,
  handHeart: HandHeart,
  sparkles: Sparkles,
  shieldCheck: ShieldCheck,

  stethoscope: Stethoscope,
  activity: Activity,
  flower: Flower,
  sun: Sun,
  moon: Moon,

  star: Star,
  clock: Clock,
  mapPin: MapPin,
  home: Home,
  coffee: Coffee,

  // new 20
  checkCircle: CheckCircle,
  award: Award,
  briefcase: Briefcase,
  graduationCap: GraduationCap,
  userCheck: UserCheck,

  baby: Baby,
  personStanding: PersonStanding,
  accessibility: Accessibility,
  eye: Eye,
  ear: Ear,

  droplets: Droplets,
  flame: Flame,
  wind: Wind,
  treePine: TreePine,
  bookOpen: BookOpen,

  messageCircle: MessageCircle,
  phone: Phone,
  mail: Mail,
  globe: Globe,
  settings: Settings,
} as const;

export const ICON_LABELS_HU: Record<keyof typeof ICON_MAP, string> = {
  // original 20
  heart: "Szív",
  leaf: "Levél",
  users: "Emberek",
  calendar: "Naptár",
  dumbbell: "Súlyzó",

  brain: "Agy",
  smile: "Mosoly",
  handHeart: "Kéz szívvel",
  sparkles: "Csillogás",
  shieldCheck: "Védőpajzs",

  stethoscope: "Sztetoszkóp",
  activity: "Aktivitás",
  flower: "Virág",
  sun: "Nap",
  moon: "Hold",

  star: "Csillag",
  clock: "Óra",
  mapPin: "Térképjelölő",
  home: "Otthon",
  coffee: "Kávé",

  // new 20
  checkCircle: "Ellenőrzött",
  award: "Elismerés",
  briefcase: "Szolgáltatás",
  graduationCap: "Képzés",
  userCheck: "Szakember",

  baby: "Gyermek",
  personStanding: "Mozgás",
  accessibility: "Akadálymentes",
  eye: "Látás",
  ear: "Hallás",

  droplets: "Hidratálás",
  flame: "Energia",
  wind: "Légzés",
  treePine: "Természet",
  bookOpen: "Tudás",

  messageCircle: "Konzultáció",
  phone: "Telefon",
  mail: "Email",
  globe: "Online",
  settings: "Beállítások",
};

export type IconKey = keyof typeof ICON_MAP;
