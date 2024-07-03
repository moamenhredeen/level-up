#include <stdio.h>
#include <string.h>

//**************************************** constants *****************************
#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN    "\x1b[36m"
#define ANSI_COLOR_RESET   "\x1b[0m"

//*************************************************  declarations **************************************************
// commands
void help_command();
void command_not_found();

// utils
void print_heading(char *heading);
void print_command(char *cmd, char *desc);
void print_option(char *opt, char *desc);

//*************************************************  main **************************************************



int main(int argc, char **argv) {


    int i = 1;
    if (strcmp(argv[i], "-h") == 0 || strcmp(argv[i], "--help") == 0){
        help_command();
    }else if (argc >= 2) {
        command_not_found();
    }else {
        help_command();
    }
    return 0;
}


void help_command(){
    // header
    print_heading("ccli command line utility");
    printf("ccli is command line utility written in c\n");
    printf("for learning purposes\n");
    // commands
    print_heading("commands");
    print_command("v, version", "print cli version");
    print_command("ls, list", "list directories");
    // options
    print_heading("options");
    print_option("-h, --help", "print help information");
}


void command_not_found() {
    printf(ANSI_COLOR_RED "command not found" ANSI_COLOR_RESET "\n");
    printf("use -h or --help to show help\n");
}


//************************************************* output utilities **************************************************

void print_heading(char *heading){
    printf(ANSI_COLOR_CYAN "%s" ANSI_COLOR_RESET "\n", heading);
}

void print_command(char *cmd, char *desc){
    printf(ANSI_COLOR_GREEN "%s" ANSI_COLOR_RESET "\t\t%s\n", cmd, desc);
}

void print_option(char *opt, char *desc){
    printf(ANSI_COLOR_GREEN "%s" ANSI_COLOR_RESET "\t\t%s\n", opt, desc);
}

