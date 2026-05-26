#! /bin/bash

USER="$1"
YEAR=$2
SHIFT=$3

NUMDAYSM="31 28 31 30 31 30 31 31 30 31 30 31"
echo "Calendar ture anul $YEAR $USER"
echo
echo -n "    "
for d in $(seq 1 31); do
  if [ $d -lt 10 ]; then
    echo -n "0$d "
  else
    echo -n "$d "
  fi
done
echo
for m in $(seq 1 12); do
  numdays=$(echo $NUMDAYSM | cut -d' ' -f $m)
  if [ $m -lt 10 ]; then
    echo -n "0$m  "
  else
    echo -n "$m  "
  fi
  for d in $(seq 1 $numdays); do
    shifts="Z N - -"
    offset=$(($d + 6 - $SHIFT))
    mm=1
    while [ $mm -lt $m ]; do
      numdays0=$(echo $NUMDAYSM | cut -d' ' -f $mm)
      offset=$(($offset + $numdays0))
      mm=$(($mm + 1))
    done
    offset=$((($offset % 4) + 1))
    nshift=$(echo "$shifts" | cut -d' ' -f $offset)
    echo -n " $nshift "
  done
  echo
done
