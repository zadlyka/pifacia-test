<?php

namespace App\Enums;

enum Permission: string
{
    case Manage_All = "0";

    case Manage_Role = "100";
    case Create_Role = "101";
    case Read_Role = "102";
    case Update_Role = "103";
    case Delete_Role = "104";

    case Manage_User = "200";
    case Create_User = "201";
    case Read_User = "202";
    case Update_User = "203";
    case Delete_User = "204";

    case Manage_Departement = "300";
    case Create_Departement = "301";
    case Read_Departement = "302";
    case Update_Departement = "303";
    case Delete_Departement = "304";

    case Manage_Division = "400";
    case Create_Division = "401";
    case Read_Division = "402";
    case Update_Division = "403";
    case Delete_Division = "404";

    case Manage_Employee = "500";
    case Create_Employee = "501";
    case Read_Employee = "502";
    case Update_Employee = "503";
    case Delete_Employee = "504";
}
