
# Ubuntu 配置 git

## 常用命令
更新分支树
```sh
git remote update origin --prune
```
查看远程分支
```sh
git branch -a
```
查看本地分支
```sh
git branch
```
创建分支
```sh
git branch develop
```
推送本地分支到远程
```sh
git push origin develop
```
切换分支
```sh
git checkout develop
```
删除本地分支
```sh
git branch –D develop
```
删除远程分支：
```sh
git branch -r -d origin/branch-name
git push origin :branch-name
```
或者
```sh
git branch –r –D origin/develop
git push --delete origin develop
```
## 重命名分支
在git中重命名远程分支，其实就是先删除远程分支，然后重命名本地分支，再重新提交一个远程分支。
例如下面的例子中，我需要把 devel 分支重命名为 develop 分支：
```sh
git branch -m devel develop
git push origin develop
```
<hr/>
