# AGENTS.md - Guidelines for Agentic Coding Agents

## Project Overview
Next.js 15.2.4 project with TypeScript, Tailwind CSS, and UI libraries (Radix UI). E-commerce platform "BHARAT KART".

## Build/Lint/Test Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint codebase
npm run lint
```

### Testing
No testing framework configured. When added:
```bash
# Run all tests
npm test

# Run single test (Jest/Vitest)
# Jest: npm test -- -t "test name"
# Vitest: npx vitest run testName
```

### Type Checking
```bash
# Check TypeScript types
npx tsc --noEmit
```

## Code Style Guidelines

### File Organization
- Components: `/components`
- Pages: `/app` (Next.js 13+ app router)
- Styles: `/styles` + Tailwind CSS
- Lib utilities: `/lib`
- Public assets: `/public`

### Import Guidelines
1. **Order**: React → Next.js → 3rd-party → Internal → Type imports
2. **Absolute Imports**: Use `@/` alias
   ```typescript
   import { Button } from '@/components/ui/button'
   import { useAuth } from '@/lib/auth'
   ```
3. **Named vs Default**: Named for components/utilities, default for React/pages

### TypeScript Guidelines
1. **Type Definitions**: Define in `.ts` files near usage; export when shared
2. **Strict Mode**: Always specify types; avoid `any`, use `unknown` when uncertain
3. **Component Props**:
   ```typescript
   interface MyComponentProps {
     title: string
     onClick?: () => void
     className?: string
   }
   
   const MyComponent: React.FC<MyComponentProps> = ({ 
     title, 
     onClick, 
     className = '' 
   }) => {
     // implementation
   }
   ```

### Formatting Guidelines
- **Indentation**: 2 spaces
- **Line Length**: Max 100 characters
- **Semicolons**: Use semicolons
- **Quotes**: Single quotes for strings, template literals for interpolation
- **Trailing Commas**: Use in multi-line objects/arrays/params

### Naming Conventions
1. **Files/Directories**: kebab-case (`user-profile.tsx`)
   - Exception: Next.js app router (`page.tsx`, `layout.tsx`)
2. **Components/Functions**: 
   - PascalCase for components (`UserProfileCard`)
   - camelCase for functions/variables (`getUserProfile`)
   - UPPER_CASE for constants (`MAX_ITEMS_PER_PAGE`)
3. **CSS Classes**: Descriptive names; Tailwind conventions; custom CSS in kebab-case (`.btn-primary`)

### Error Handling
1. **Async Operations**: try/catch for async/await; handle Promise rejections
2. **Error Boundaries**: Use React Error Boundaries with fallback UIs
3. **Validation**: Use Zod for schema validation; validate inputs/API responses

### React Best Practices
1. **Hooks**: Top-level only; from React functions; exhaustive-deps for useEffect
2. **Performance**: React.memo for expensive components; useCallback/useMemo appropriately
3. **Accessibility**: WCAG guidelines; semantic HTML; proper ARIA; keyboard navigation

### Styling Guidelines (Tailwind CSS)
1. **Class Organization**: Positioning → box model → typography → visual → etc.
2. **Conditional Classes**: Use tailwind-merge
3. **Custom CSS**: `/styles/globals.css` or CSS modules; CSS variables for themes
4. **Dark Mode**: Use `next-themes`; Tailwind `dark:` variants

### Specific Library Guidelines
1. **Radix UI**: Follow composition API; use Slot component; style via className/style
2. **React Hook Form**: Resolvers with Zod; follow RHF performance best practices
3. **Supabase**: Client from `@supabase/supabase-js`; handle auth states; use real-time

## Cursor Rules / Copilot Instructions
No specific Cursor or Copilot rules files found.

## Additional Notes
- Next.js 15 with App Router
- TypeScript strict type checking
- Tailwind CSS v4
- UI libraries: Radix UI, Sonner, etc.
- Consider adding testing setup (Jest/Vitest)
- Manage environment variables properly (not in repo)
