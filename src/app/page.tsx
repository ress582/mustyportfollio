'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, MessageCircle, Github, Linkedin, ExternalLink, Code, Palette, Gamepad2, Zap, Settings, X, Moon, Sun } from 'lucide-react';

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsPassword, setSettingsPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [backgroundType, setBackgroundType] = useState<'none' | 'image' | 'gif'>('none');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Load saved settings
    const savedBackground = localStorage.getItem('portfolioBackground');
    const savedBackgroundType = localStorage.getItem('portfolioBackgroundType');
    const savedDarkMode = localStorage.getItem('portfolioDarkMode');
    
    if (savedBackground && savedBackgroundType) {
      setBackgroundUrl(savedBackground);
      setBackgroundType(savedBackgroundType as 'none' | 'image' | 'gif');
    }
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
      if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
      }
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSettingsAuth = () => {
    if (settingsPassword === 'musty123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleBackgroundChange = (url: string, type: 'image' | 'gif') => {
    setBackgroundUrl(url);
    setBackgroundType(type);
    localStorage.setItem('portfolioBackground', url);
    localStorage.setItem('portfolioBackgroundType', type);
  };

  const clearBackground = () => {
    setBackgroundUrl('');
    setBackgroundType('none');
    localStorage.removeItem('portfolioBackground');
    localStorage.removeItem('portfolioBackgroundType');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('portfolioDarkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const projects = [
    {
      title: "UI Based Lobby System",
      description: "A modern, responsive lobby system with sleek UI design, smooth animations, and intuitive user experience for Roblox games.",
      tags: ["Roblox", "Lua", "UI Design", "TweenService"],
      image: "https://img.youtube.com/vi/hHzXiTap50k/maxresdefault.jpg",
      youtubeLink: "https://www.youtube.com/watch?v=hHzXiTap50k"
    },
    {
      title: "Advanced Telekinesis System",
      description: "Sophisticated telekinesis mechanics with object manipulation, physics integration, and smooth player controls for immersive gameplay.",
      tags: ["Roblox", "Lua", "Physics", "CFrame"],
      image: "https://img.youtube.com/vi/RkYg7ufnkuY/maxresdefault.jpg",
      youtubeLink: "https://www.youtube.com/watch?v=RkYg7ufnkuY"
    },
    {
      title: "Sword Combat M1 System",
      description: "Dynamic sword combat system with combo mechanics, hit detection, damage calculation, and smooth animation integration.",
      tags: ["Roblox", "Lua", "Combat", "Animation"],
      image: "https://img.youtube.com/vi/JH39QHBTvLs/maxresdefault.jpg",
      youtubeLink: "https://www.youtube.com/watch?v=JH39QHBTvLs"
    }
  ];

  const skills = [
    { name: "Lua Scripting", icon: Code, level: 95 },
    { name: "UI/UX Design", icon: Palette, level: 90 },
    { name: "Game Systems", icon: Gamepad2, level: 92 },
    { name: "Performance Optimization", icon: Zap, level: 88 }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-background'
    }`}>
      {/* Custom Background */}
      {backgroundUrl && backgroundType !== 'none' && (
        <div className="fixed inset-0 z-0">
          <img 
            src={backgroundUrl} 
            alt="Custom background" 
            className={`w-full h-full object-cover ${backgroundType === 'gif' ? 'animate-pulse' : ''}`}
            style={{ 
              opacity: darkMode ? 0.4 : 0.3,
              filter: darkMode ? 'blur(0.5px)' : 'blur(1px)'
            }}
          />
          <div className={`absolute inset-0 ${
            darkMode ? 'bg-gray-900/70' : 'bg-background/80'
          }`}></div>
        </div>
      )}

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className={`fixed top-20 right-6 z-50 p-3 rounded-full transition-all duration-200 backdrop-blur-sm ${
          darkMode 
            ? 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-200' 
            : 'bg-primary/10 hover:bg-primary/20 text-primary'
        }`}
        title="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`border rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-background border-border'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : ''}`}>Settings</h3>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setIsAuthenticated(false);
                  setSettingsPassword('');
                }}
                className={`p-1 rounded transition-colors ${
                  darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="space-y-4">
                <p className={darkMode ? 'text-gray-300' : 'text-muted-foreground'}>
                  Enter password to access settings:
                </p>
                <input
                  type="password"
                  value={settingsPassword}
                  onChange={(e) => setSettingsPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-primary' 
                      : 'border-border focus:ring-primary'
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSettingsAuth()}
                />
                <Button onClick={handleSettingsAuth} className="w-full">
                  Unlock Settings
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Dark Mode Toggle */}
                <div>
                  <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : ''}`}>Appearance</h4>
                  <div className="flex items-center justify-between p-3 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      {darkMode ? (
                        <Moon className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Sun className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className={darkMode ? 'text-gray-200' : ''}>
                        {darkMode ? 'Dark Mode' : 'Light Mode'}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleDarkMode}
                      className={`transition-all duration-200 hover:scale-105 ${
                        darkMode 
                          ? 'border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white' 
                          : 'border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                      }`}
                    >
                      {darkMode ? 'Switch to Light' : 'Switch to Dark'}
                    </Button>
                  </div>
                </div>

                {/* Custom Background */}
                <div>
                  <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : ''}`}>Custom Background</h4>
                  <div className="space-y-3">
                    <input
                      type="url"
                      placeholder="Enter image or GIF URL"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:ring-primary' 
                          : 'border-border focus:ring-primary'
                      }`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const url = (e.target as HTMLInputElement).value;
                          if (url.toLowerCase().includes('.gif')) {
                            handleBackgroundChange(url, 'gif');
                          } else {
                            handleBackgroundChange(url, 'image');
                          }
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          const input = document.querySelector('input[type="url"]') as HTMLInputElement;
                          const url = input.value;
                          if (url) {
                            if (url.toLowerCase().includes('.gif')) {
                              handleBackgroundChange(url, 'gif');
                            } else {
                              handleBackgroundChange(url, 'image');
                            }
                          }
                        }}
                        className="flex-1"
                      >
                        Set Background
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={clearBackground}
                        className={`flex-1 transition-all duration-200 hover:scale-105 ${
                          darkMode 
                            ? 'border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white' 
                            : 'border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>

                {backgroundUrl && (
                  <div className={`p-3 rounded-lg transition-colors ${
                    darkMode ? 'bg-gray-700' : 'bg-muted'
                  }`}>
                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>
                      Current background:
                    </p>
                    <p className={`text-xs font-mono break-all ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
                      {backgroundUrl}
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
                      Type: {backgroundType.toUpperCase()} | Mode: {darkMode ? 'DARK' : 'LIGHT'}
                    </p>
                  </div>
                )}

                <div className={`pt-4 border-t transition-colors ${
                  darkMode ? 'border-gray-700' : 'border-border'
                }`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
                    Background and theme changes are saved for all visitors and will persist across sessions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? (darkMode 
              ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700 shadow-sm' 
              : 'bg-background/95 backdrop-blur-md border-b shadow-sm'
            ) 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
              darkMode 
                ? 'from-blue-400 to-purple-400' 
                : 'from-primary to-primary/60'
            }`}>
              Musty's Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`transition-all duration-200 capitalize relative group ${
                    activeSection === section 
                      ? (darkMode ? 'text-blue-400 font-medium' : 'text-primary font-medium')
                      : (darkMode ? 'text-gray-300 hover:text-white' : 'text-muted-foreground hover:text-foreground')
                  }`}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r transition-all duration-300 ${
                    activeSection === section 
                      ? (darkMode ? 'from-blue-400 to-purple-400 scale-x-100' : 'from-primary to-primary/60 scale-x-100')
                      : (darkMode ? 'from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-50' : 'from-primary to-primary/60 scale-x-0 group-hover:scale-x-50')
                  }`}></span>
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-300 ${
          darkMode 
            ? 'from-gray-900 via-gray-900 to-gray-800/20' 
            : 'from-background via-background to-muted/20'
        }`}></div>
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] transition-colors duration-300 ${
          darkMode 
            ? 'from-transparent via-transparent to-gray-800/10' 
            : 'from-transparent via-transparent to-muted/10'
        }`}></div>
        
        {/* Animated background elements */}
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse transition-colors duration-300 ${
          darkMode ? 'bg-blue-500/10' : 'bg-primary/5'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-300 ${
          darkMode ? 'bg-purple-500/10' : 'bg-primary/5'
        }`}></div>
        
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className={`inline-block p-1 rounded-full mb-6 transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                  : 'bg-gradient-to-r from-primary/20 to-primary/10'
              }`}>
                <div className={`rounded-full px-6 py-2 text-sm font-medium backdrop-blur-sm transition-colors duration-300 ${
                  darkMode ? 'bg-gray-800 text-blue-300' : 'bg-background'
                }`}>
                  Available for commissions
                </div>
              </div>
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
                darkMode 
                  ? 'from-blue-400 via-white to-purple-400' 
                  : 'from-foreground via-foreground to-muted-foreground'
              }`}>
                Hi, I'm Musty
              </h1>
              <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-muted-foreground'
              }`}>
                Elite Roblox Developer crafting immersive game experiences with cutting-edge Lua scripting and innovative game systems
              </p>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Button 
                size="lg" 
                onClick={() => scrollToSection('projects')} 
                className={`text-lg px-8 hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : ''
                }`}
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => scrollToSection('contact')} 
                className={`text-lg px-8 hover:scale-105 transition-transform duration-200 ${
                  darkMode 
                    ? 'border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white' 
                    : ''
                }`}
              >
                Get In Touch
              </Button>
            </div>
            <div className={`flex justify-center space-x-6 transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {[
                { icon: Github, href: "https://www.roblox.com/users/2617971881/profile", label: "Roblox" },
                { icon: MessageCircle, href: "https://discord.com/users/1009123528362184756", label: "Discord" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-all duration-200 hover:scale-110 p-2 rounded-full ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-muted-foreground'
          }`} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800/30' : 'bg-muted/30'
      }`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              darkMode ? 'text-white' : ''
            }`}>About Musty</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-muted-foreground'
                }`}>
                  I'm an elite Roblox developer with a passion for creating immersive gaming experiences through advanced Lua scripting. My journey began with a fascination for game mechanics and has evolved into a career where I bring innovative ideas to life in the Roblox universe.
                </p>
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-muted-foreground'
                }`}>
                  I specialize in developing complex game systems, from sophisticated telekinesis mechanics to fluid combat systems and intuitive UI designs. My scripts are known for their clean architecture, optimal performance, and seamless integration with Roblox's engine.
                </p>
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-muted-foreground'
                }`}>
                  When I'm not coding, you can find me exploring new Roblox features, optimizing existing systems, or collaborating with other developers to push the boundaries of what's possible on the platform.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "50+", label: "Scripts Delivered" },
                  { value: "1.5+", label: "Years Experience" },
                  { value: "30+", label: "Happy Clients" },
                  { value: "15+", label: "Game Systems" }
                ].map((stat, index) => (
                  <Card 
                    key={index} 
                    className={`text-center p-6 hover:shadow-lg transition-all duration-300 ${
                      darkMode ? 'bg-gray-800 border-gray-700' : ''
                    }`}
                  >
                    <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                      darkMode ? 'text-blue-400' : 'text-primary'
                    }`}>
                      {stat.value}
                    </div>
                    <div className={`transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-muted-foreground'
                    }`}>
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : ''
      }`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              darkMode ? 'text-white' : ''
            }`}>Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {skills.map((skill, index) => (
                <Card 
                  key={index} 
                  className={`p-6 hover:shadow-lg transition-all duration-300 group ${
                    darkMode ? 'bg-gray-800 border-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <skill.icon className={`w-8 h-8 mr-3 group-hover:scale-110 transition-transform duration-200 ${
                      darkMode ? 'text-blue-400' : 'text-primary'
                    }`} />
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                      darkMode ? 'text-white' : ''
                    }`}>
                      {skill.name}
                    </h3>
                  </div>
                  <div className={`w-full rounded-full h-3 overflow-hidden transition-colors duration-300 ${
                    darkMode ? 'bg-gray-700' : 'bg-muted'
                  }`}>
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                        darkMode 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-primary to-primary/80'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className={`text-right text-sm mt-2 font-medium transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-muted-foreground'
                  }`}>
                    {skill.level}%
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Lua", "Roblox Studio", "UI Design", "TweenService", "Physics", "Animation", "DataStore", "RemoteEvents", "ModuleScripts", "OOP", "Performance", "Debugging"].map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className={`text-sm px-4 py-2 hover:scale-105 transition-all duration-200 cursor-pointer ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                      : 'hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800/30' : 'bg-muted/30'
      }`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              darkMode ? 'text-white' : ''
            }`}>Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={index} 
                  className={`group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : ''
                  }`}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-lg">{project.title}</h3>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                        Watch Demo
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className={`mb-4 leading-relaxed transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-muted-foreground'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className={`text-xs transition-colors duration-200 ${
                            darkMode 
                              ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                              : 'hover:bg-primary hover:text-primary-foreground'
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full transition-all duration-200 hover:scale-105 ${
                        darkMode 
                          ? 'border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white' 
                          : 'border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                      }`}
                      onClick={() => window.open(project.youtubeLink, '_blank')}
                    >
                      View on YouTube <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Card className={`p-8 max-w-2xl mx-auto transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : ''
              }`}>
                <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-white' : ''
                }`}>Play My Game</h3>
                <p className={`mb-6 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-muted-foreground'
                }`}>
                  Experience my telekinesis system firsthand in this interactive test environment
                </p>
                <Button 
                  size="lg" 
                  onClick={() => window.open('https://www.roblox.com/games/101679825721005/talekenisis-test', '_blank')}
                  className={`hover:scale-105 transition-transform duration-200 ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`}
                >
                  Play Telekinesis Test
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : ''
      }`}>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : ''
            }`}>Let's Work Together</h2>
            <p className={`text-xl mb-12 leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-muted-foreground'
            }`}>
              Interested in commissioning a custom Roblox script or game system? Reach out to me directly through Discord or check out my Roblox profile!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className={`p-8 hover:shadow-lg transition-all duration-300 group ${
                darkMode ? 'bg-gray-800 border-gray-700' : ''
              }`}>
                <div className="flex flex-col items-center space-y-4">
                  <div className={`p-4 rounded-full transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-blue-500/20 group-hover:bg-blue-500/30' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    <MessageCircle className={`w-8 h-8 transition-colors duration-300 ${
                      darkMode ? 'text-blue-400' : 'text-primary'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-white' : ''
                  }`}>Discord</h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-muted-foreground'
                  }`}>
                    Chat with me directly for project inquiries and collaborations
                  </p>
                  <Button 
                    onClick={() => window.open('https://discord.com/users/1009123528362184756', '_blank')}
                    className={`w-full transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : ''
                    }`}
                  >
                    Message on Discord
                  </Button>
                </div>
              </Card>

              <Card className={`p-8 hover:shadow-lg transition-all duration-300 group ${
                darkMode ? 'bg-gray-800 border-gray-700' : ''
              }`}>
                <div className="flex flex-col items-center space-y-4">
                  <div className={`p-4 rounded-full transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-purple-500/20 group-hover:bg-purple-500/30' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    <Github className={`w-8 h-8 transition-colors duration-300 ${
                      darkMode ? 'text-purple-400' : 'text-primary'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-white' : ''
                  }`}>Roblox Profile</h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-muted-foreground'
                  }`}>
                    Check out my profile, games, and recent activity on Roblox
                  </p>
                  <Button 
                    onClick={() => window.open('https://www.roblox.com/users/2617971881/profile', '_blank')}
                    className={`w-full transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-purple-600 hover:bg-purple-700' : ''
                    }`}
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            </div>

            <div className={`rounded-lg p-6 transition-colors duration-300 ${
              darkMode ? 'bg-gray-800' : 'bg-muted/50'
            }`}>
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : ''
              }`}>Commission Information</h3>
              <p className={`mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-muted-foreground'
              }`}>
                I accept commissions for custom Roblox scripts, game systems, and UI design. 
                Payment accepted in USD and Robux.
              </p>
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className={`px-4 py-2 transition-colors duration-300 ${
                  darkMode ? 'border-gray-600 text-gray-300' : ''
                }`}>
                  USD Payments
                </Badge>
                <Badge variant="outline" className={`px-4 py-2 transition-colors duration-300 ${
                  darkMode ? 'border-gray-600 text-gray-300' : ''
                }`}>
                  Robux Payments
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-muted/20'
      }`}>
        <div className="container mx-auto px-6 text-center">
          <p className={`transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-muted-foreground'
          }`}>
            © 2024 Musty. Elite Roblox Developer specializing in Lua scripting and game systems.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-500' : 'text-muted-foreground'
            }`}>Payment methods:</span>
            <Badge variant="outline" className={`text-xs transition-colors duration-300 ${
              darkMode ? 'border-gray-600 text-gray-300' : ''
            }`}>
              USD
            </Badge>
            <Badge variant="outline" className={`text-xs transition-colors duration-300 ${
              darkMode ? 'border-gray-600 text-gray-300' : ''
            }`}>
              Robux
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}