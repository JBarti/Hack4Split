# Hack4Split


## Mysql setup guide

**First run**

If you are runing the docker database container for the first time you will need to set it up first.
To install docker on a windows machine follow their official installation guide: https://docs.docker.com/get-docker/

After you have installed docker you need to pull the docker image for the mysql container.

``` bash
docker pull mysql
```

After that you will need to do the initial run of the container providing it necessary parameters required to set up
our database.

``` bash
docker run --name mysql_mindmap \
-e MYSQL_ROOT_PASSWORD='admin' \
-e MYSQL_USER='udrugadyxy' \
-e MYSQL_PASSWORD='dyxyudrugasplit2020' \
-e MYSQL_DATABASE='mindmaps' \
-p 3306:3306 mysql
```

**Already initialized the database*

If you have already tried to run the mysql container once you can later on just start it again using the following
command.

```bash
docker start mysql_mindmap
```

**Killing the database container**

```bash
docker kill mysql_mindmap
```
