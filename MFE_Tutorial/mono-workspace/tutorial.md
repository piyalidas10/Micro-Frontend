
# Micro Frontends on Monorepo

## Advantages 
1.	single repository contains multiple projects
2.	Netflix, Google, Uber, Facebook are using mono repo
3.	Easier Collaboration because everything is in a single repo, so everybody has everything in one place. Then everybody can collaborate with everybody else.
4.	Refactoring is easier as well because if you want to reactor something across multiple projects across the whole system having everything in one repo and everything in one file system is almost certainly easy. 
5.	Version upgrade is easy because single repo is being used for multiple projects. Change the repo version, it will upgrade all project’s version. You have to manage single repo’s version.

## Diadvantages
1.	Whenever dependency changes we need to build all the projects. It can take hours.
2.	Refactoring is easier, not really true. It is true in some cases when we have smaller projects or smaller organizations. But imagine we have thousands of projects, you are not going to refactor the whole system at once. 
3.	Cloning a huge repository can be extremely slow
4.	Build file size bigger & deployment time is also more than multi repo
5.	Mono repo encourage tight coupling
6.	Pipeline issue i.e your pipeline need to figure out what changed & what should be triggered as a result of that change & what should be built & what should not be built 
7.	There can be issue of pull requests because hundreds are making pull requests all to the same repository 
8.	Complexity is more because everything in inside one repo.
Remember the fact that google is doing something that doesn’t mean that you should be doing that something
