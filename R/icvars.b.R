
# This file is a generated template, your changes will not be overwritten

ICVARSClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "ICVARSClass",
    inherit = ICVARSBase,
    private = list(
        .run = function() {

            # `self$data` contains the data
            # `self$options` contains the options
            # `self$results` contains the results object (to populate)
            
            if ( is.null(self$data) || is.null(self$options$dep) || is.null(self$options$group))
            {print("Select your variables")} else {

            formula <- jmvcore::constructFormula(self$options$dep, self$options$group)
            formula <- as.formula(formula)
            
            n <- aggregate(self$data[,self$options$group], list(num=self$data[,self$options$group]), length)
            res <- aggregate(self$data[,self$options$dep], list(self$data[,self$options$group]), FUN=var)
            
            LI1 <- res[[2]][1]*(n[[2]][1]-1)/qchisq(1-(1-self$options$ci)/2,(n[[2]][1]-1))
            LS1 <- res[[2]][1]*(n[[2]][1]-1)/qchisq((1-self$options$ci)/2,(n[[2]][1]-1))
            LI2 <- res[[2]][2]*(n[[2]][2]-1)/qchisq(1-(1-self$options$ci)/2,(n[[2]][2]-1))
            LS2 <- res[[2]][2]*(n[[2]][2]-1)/qchisq((1-self$options$ci)/2,(n[[2]][2]-1))
            
            
            results <- var.test(formula, self$data, conf.level=self$options$ci)
            
            resultall <- data.frame(
                grupo=c(paste0(n[1,1]),paste0(n[2,1]), "ratio"), 
                n=c(n[1,2],n[2,2], n[1,2]+n[2,2]),
                Var=c(res[1,2], res[2,2], res[1,2]/res[2,2]),
                LI=c(LI1,LI2,results$conf.int[[1]]), 
                LS=c(LS1,LS2,results$conf.int[[2]]))
            
          # self$results$text$setContent(resultall)
            
           table <- self$results$icvars
           
           tabTitStr <- ('Intervalos de Conf. Varianc. - {dep}')
           tabTit <- jmvcore::format(tabTitStr, dep=self$options$dep)
           table$setTitle(tabTit)
           
           ciTitle <- paste0("Intervalo de Conf. a ",self$options$ci*100, '%')
           table$getColumn('Lower')$setSuperTitle(ciTitle)
           table$getColumn('Upper')$setSuperTitle(ciTitle)
           table$setRow(rowNo=1, values=list(
                var=self$options$dep,
                group=resultall$grupo[1],
                n=resultall$n[1],
                Variance=resultall$Var[1],
                Lower=resultall$LI[1],
                Upper=resultall$LS[1]
                ))
           
           table$setRow(rowNo=2, values=list(
               var="",
               group=resultall$grupo[2],
               n=resultall$n[2],
               Variance=resultall$Var[2],
               Lower=resultall$LI[2],
               Upper=resultall$LS[2]
           ))
           
           table$setRow(rowNo=3, values=list(
               var="",
               group=resultall$grupo[3],
               n=resultall$n[3],
               Variance=resultall$Var[3],
               Lower=resultall$LI[3],
               Upper=resultall$LS[3]
           ))
        }
        })
)
